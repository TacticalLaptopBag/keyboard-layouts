import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

export const DEFAULT_START_TIME = '10:00'

@Component({
    selector: 'app-timer',
    imports: [ReactiveFormsModule],
    templateUrl: './timer.html',
    styleUrl: './timer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Timer implements OnInit {
    @Output()
    public timeout = new EventEmitter()
    @Output()
    public reset = new EventEmitter()
    public startTime = DEFAULT_START_TIME
    public timerControl = new FormControl(this.startTime)
    public isTimerRunning = false

    private _interval = -1

    ngOnInit(): void {
        this.timerControl.disable()
    }

    public start() {
        if(this._interval >= 0) {
            this.stop()
        }

        this.isTimerRunning = true
        this.startTime = this.timerControl.value ?? DEFAULT_START_TIME
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
        // this.timerControl.enable()
    }

    private padZeros(num: number): string {
        return num.toString().padStart(2, '0')
    }

    private tick() {
        const timeSplit = this.timerControl.value?.split(':')
        if(!timeSplit) return
        let mins = Number.parseInt(timeSplit[0])
        let secs = Number.parseInt(timeSplit[1])
        secs -= 1
        if(secs <= 0 && mins <= 0) {
            this.timeout.emit()
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
        this.reset.emit()
    }
}
