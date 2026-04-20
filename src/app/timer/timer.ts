import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-timer',
    imports: [ReactiveFormsModule],
    templateUrl: './timer.html',
    styleUrl: './timer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Timer {
    @Output()
    public timeout = new EventEmitter<number>()
    @Output()
    public reset = new EventEmitter()
    public startTime = environment.defaultStartTime
    public timerControl = new FormControl(this.startTime)
    public isTimerRunning = false

    private _interval = -1

    public start() {
        if(this._interval >= 0) {
            this.stop()
        }

        this.isTimerRunning = true
        this.startTime = this.timerControl.value ?? environment.defaultStartTime
        this.timerControl.disable()
        this._interval = setInterval(() => {
            this.tick()
        }, 1000)
    }

    public stop() {
        if(this._interval < 0) return
        clearInterval(this._interval)
        this._interval = -1
        this.timerControl.setValue(this.startTime)
        this.isTimerRunning = false
    }

    private padZeros(num: number): string {
        return num.toString().padStart(2, '0')
    }

    private parseTime(timeStr: string): [number, number] {
        const timeSplit = timeStr.split(':')
        const minutes = Number.parseInt(timeSplit[0])
        const seconds = Number.parseInt(timeSplit[1])
        return [minutes, seconds]
    }

    private tick() {
        if(!this.timerControl.value) return
        let [mins, secs] = this.parseTime(this.timerControl.value)

        secs -= 1
        if(secs <= 0 && mins <= 0) {
            const [startMins, startSecs] = this.parseTime(this.startTime)
            this.timeout.emit(startMins + startSecs / 60)
            this.stop()
            return
        }

        if(secs < 0) {
            mins -= 1
            secs = 59
        }

        this.timerControl.setValue(`${this.padZeros(mins)}:${this.padZeros(secs)}`)
    }

    public onResetClicked() {
        this.stop()
        this.timerControl.enable()
        this.reset.emit()
    }

    private resetValue(emitEvent: boolean = false) {
        this.timerControl.setValue(environment.defaultStartTime, { emitEvent })
    }

    public onChanged() {
        const inputValue = this.timerControl.value
        if(!inputValue) {
            this.resetValue()
            return
        }

        let mins: number
        let secs: number
        if(/^[0-9]+:[0-9]+$/.test(inputValue)) {
            [mins, secs] = this.parseTime(inputValue)
            mins += Math.floor(secs / 60)
            secs -= 60 * Math.floor(secs / 60)
        } else {
            const inputNum = Number.parseInt(inputValue)
            if(Number.isNaN(inputNum)) {
                this.resetValue()
                return
            }

            mins = Math.floor(inputNum / 60)
            secs = inputNum - (60 * mins)
        }

        this.timerControl.setValue(`${this.padZeros(mins)}:${this.padZeros(secs)}`, { emitEvent: false })
    }
}
