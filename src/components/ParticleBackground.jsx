/**
 * AmbientBackground — Zero-dependency CSS floating blobs
 * Replaces the Three.js WebGL particle system.
 * Works on all screen sizes with no GPU overhead.
 */
export default function ParticleBackground() {
  const blobs = [
    // Top-left large anchor blob
    {
      className: 'blob-a',
      style: {
        top: '-10%',
        left: '-8%',
        width: 520,
        height: 520,
        background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, rgba(59,130,246,0.06) 55%, transparent 75%)',
      },
    },
    // Bottom-right large anchor blob
    {
      className: 'blob-b',
      style: {
        bottom: '-12%',
        right: '-10%',
        width: 580,
        height: 580,
        background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(37,99,235,0.05) 50%, transparent 72%)',
      },
    },
    // Centre-right mid blob
    {
      className: 'blob-c',
      style: {
        top: '35%',
        right: '8%',
        width: 360,
        height: 360,
        background: 'radial-gradient(circle, rgba(99,160,255,0.10) 0%, rgba(37,99,235,0.04) 55%, transparent 75%)',
      },
    },
    // Centre-left mid blob
    {
      className: 'blob-d',
      style: {
        top: '52%',
        left: '5%',
        width: 320,
        height: 320,
        background: 'radial-gradient(circle, rgba(37,99,235,0.09) 0%, rgba(59,130,246,0.03) 60%, transparent 78%)',
      },
    },
    // Top-right accent blob
    {
      className: 'blob-e',
      style: {
        top: '6%',
        right: '18%',
        width: 260,
        height: 260,
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
      },
    },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={blob.className}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            filter: 'blur(70px)',
            willChange: 'transform',
            ...blob.style,
          }}
        />
      ))}
    </div>
  );
}
