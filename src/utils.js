export const DisplayFormikState = (props) => (
  <div style={{ margin: '1rem 0' }}>
    <p style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '1rem',
        padding: '0.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>
);
