const smallAdjustment: number = 5 * 60 * 1000
const largeAdjustment: number = 30 * 60 * 1000
export const timerAdjustments: { [key: string]: number } = {
  plus: smallAdjustment,
  plusplus: largeAdjustment,
  minus: -smallAdjustment,
  minusminus: -largeAdjustment,
}

export type TimerButtonAction =
  | 'PLUS'
  | 'PLUSPLUS'
  | 'MINUS'
  | 'MINUSMINUS'
  | 'STARTPAUSE'
  | 'CANCEL'
  | 'TOGGLEDISPLAY'

export const MINUSMINUS: TimerButtonAction = 'MINUSMINUS'
export const PLUSPLUS: TimerButtonAction = 'PLUSPLUS'
export const PLUS: TimerButtonAction = 'PLUS'
export const MINUS: TimerButtonAction = 'MINUS'
export const STARTPAUSE: TimerButtonAction = 'STARTPAUSE'
export const CANCEL: TimerButtonAction = 'CANCEL'
export const TOGGLEDISPLAY: TimerButtonAction = 'TOGGLEDISPLAY'
