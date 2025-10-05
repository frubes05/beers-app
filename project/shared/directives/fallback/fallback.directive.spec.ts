import { FALLBACK_IMAGE } from '@root/app.constants';
import { FallbackImageDirective } from '@shared/directives/fallback/fallback.directive';

describe('FallbackImageDirective', () => {
  let fallbackImageDirective: FallbackImageDirective;
  let img: HTMLImageElement;
  let fallbackImage = FALLBACK_IMAGE;
  let errorImage = 'error-img.jpg';

  beforeEach(() => {
    img = document.createElement('img');
    img.src = errorImage;

    fallbackImageDirective = new FallbackImageDirective();
    fallbackImageDirective.fallback = fallbackImage;
  });

  it('should replace src with fallback on error', () => {
    expect(img.src).toContain(errorImage);

    const errorEvent = new Event('error');
    Object.defineProperty(errorEvent, 'target', { value: img });
    fallbackImageDirective.onError(errorEvent);

    expect(img.src).toContain(fallbackImage);
  });

  it('should not replace src if it is already fallback', () => {
    img.src = fallbackImage;

    const errorEvent = new Event('error');
    Object.defineProperty(errorEvent, 'target', { value: img });
    fallbackImageDirective.onError(errorEvent);

    expect(img.src).toContain(fallbackImage);
  });
});
