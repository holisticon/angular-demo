import { Blueprint, createBlueprintBuilder } from '@ngxp/builder';
import { random } from 'faker';
import { RouterState } from '../../lib/router-state.model';
import { routerStateSnapshot } from './router-state-snapshot.data';

const routerStateBlueprint: Blueprint<RouterState> = {
    navigationId: () => random.number({ min: 1, max: 5, precision: 1 }),
    state: () => routerStateSnapshot
};
export const routerStateBuilder = createBlueprintBuilder(routerStateBlueprint);

export const routerState: RouterState = routerStateBuilder().freeze().build();
