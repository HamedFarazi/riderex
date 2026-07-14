declare namespace JSX {
  interface IntrinsicElements {
    'model-viewer': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string;
        alt?: string;
        poster?: string;
        'camera-controls'?: boolean | string;
        'auto-rotate'?: boolean | string;
        'shadow-intensity'?: string | number;
        'touch-action'?: string;
        exposure?: string | number;
        'environment-image'?: string;
        loading?: string;
        reveal?: string;
        style?: React.CSSProperties;
        className?: string;
        ar?: boolean | string;
        'ar-modes'?: string;
        'rotation-per-second'?: string;
        'field-of-view'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        'camera-orbit'?: string;
        onLoad?: React.ReactEventHandler<HTMLElement>;
        onError?: React.ReactEventHandler<HTMLElement>;
        onProgress?: React.ReactEventHandler<HTMLElement>;
      },
      HTMLElement
    >;
  }
}
