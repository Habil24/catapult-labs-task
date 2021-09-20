import App from '../components/App';
import { shallow } from 'enzyme'

describe('<App />', () => {
  it('renders', () => {
    expect(shallow(<App />)).toMatchSnapshot()
  })
})
