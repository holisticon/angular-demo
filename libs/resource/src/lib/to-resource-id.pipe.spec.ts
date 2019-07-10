import { resource } from '@ngxp/resource/test';
import { getId } from './resource.utils';
import { ToResourceIdPipe } from './to-resource-id.pipe';

describe('ToResourceIdPipe', () => {
    let pipe: ToResourceIdPipe;

    beforeEach(() => {
        pipe = new ToResourceIdPipe();
    });

    it('delegates to the getId utility method', () => {
        expect(pipe.transform(resource)).toBe(getId(resource));
    });

});
