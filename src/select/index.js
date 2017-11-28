import Fittest from './Fittest'
import Roulette from './Roulette'
import TournamentN from './TournamentN'
import Uniform from './Uniform'

export default {
  Fittest,
  Roulette,
  TournamentN,
  Tournament2: TournamentN(2),
  Tournament3: TournamentN(3),
  Uniform,
}
