import { shallow } from 'enzyme'

import Dashboard from '../components/Dashboard'
import { fetchMeterReadings } from '../utils/api'

jest.mock('../utils/api')

describe('<Dashboard />', () => {
    const initalMeterData = {
        labels: ['11 Sep 2021', '13 Sep 2021', '15 Sep 2021', '16 Sep 2021'],
        data: [81, 132, 45, 57]
    }

    beforeEach(() => {
        fetchMeterReadings.mockReturnValue(initalMeterData)
    })

    it('renders with empty data', async () => {
        expect(await shallow(<Dashboard />)).toMatchSnapshot()
    })

    it('loads data when component mounted', async () => {
        expect(await shallow(<Dashboard />).instance().componentDidMount()).toMatchSnapshot()
    })
})
