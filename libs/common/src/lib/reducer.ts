import { Action } from '@ngrx/store';

export type ReducerArgs<T> = [T | undefined, Action];
