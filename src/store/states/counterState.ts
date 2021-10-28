export interface CounterState {
   value: number
   status: 'idle' | 'loading' | 'failed'
}

export const counterState: CounterState = {
   value: 0,
   status: 'idle',
}
