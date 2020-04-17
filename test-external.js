const Wrapper = ({ children }) => (
  <div style={{
    background: 'black',
    width: '100%',
    height: '100%',
    padding: '14rem 2rem'
  }}>
    {children}
  </div>
)

const Title = () => (
  <h1 style={{ color: 'red' }}>
    Hello World!
  </h1>
)

render(
  <Wrapper>
    <Title />
  </Wrapper>
)