import { resource } from '@ngxp/resource/test';
import { getUri } from './resource.utils';
import { ToResourceUriPipe } from './to-resource-uri.pipe';

describe('ToResourceUriPipe', () => {
    let pipe: ToResourceUriPipe;

    beforeEach(() => {
        pipe = new ToResourceUriPipe();
    });

    it('delegates to the getUri utility method', () => {
        expect(pipe.transform(resource)).toBe(getUri(resource));
    });

});
