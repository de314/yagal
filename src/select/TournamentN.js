import _ from 'lodash'
import Uniform from './Uniform'

const TournamentN = (count, subSelector = Uniform) => (population, r) =>
  _.maxBy(_.range(count).map(() => subSelector(population, r)), 'fitness')

export default TournamentN
