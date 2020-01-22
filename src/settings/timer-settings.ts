// the only real settings here are the small- and largeAdjustment

const smallAdjustment: number = 5 * 60 * 1000
const largeAdjustment: number = 30 * 60 * 1000
export const timerAdjustments: { [key: string]: number } = {
  plus: smallAdjustment,
  plusplus: largeAdjustment,
  minus: -smallAdjustment,
  minusminus: -largeAdjustment,
}

export type TimerButtonTask =
  | 'PLUS'
  | 'PLUSPLUS'
  | 'MINUS'
  | 'MINUSMINUS'
  | 'STARTPAUSE'
  | 'CANCEL'

export const MINUSMINUS: TimerButtonTask = 'MINUSMINUS'
export const PLUSPLUS: TimerButtonTask = 'PLUSPLUS'
export const PLUS: TimerButtonTask = 'PLUS'
export const MINUS: TimerButtonTask = 'MINUS'
export const STARTPAUSE: TimerButtonTask = 'STARTPAUSE'
export const CANCEL: TimerButtonTask = 'CANCEL'
