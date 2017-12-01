import 'babel-polyfill'
import { expect } from 'chai'
import Random from '../src/Random'

describe('Random', function() {
  describe('doubles', function() {
    it('should generate the same result for the same seed', function() {
      expect(new Random(314).rand()).to.equal(new Random(314).rand())
    })
    it('should generate different results for different seeds', function() {
      expect(new Random(314).rand()).to.not.equal(new Random(2718).rand())
    })
    it('should generate [0, 1) with no params', function() {
      expect(new Random(0).rand()).to.equal(0.548813502304256)
    })
    it('should generate [0, <max>)', function() {
      expect(new Random(0).rand(100)).to.equal(54.881350230425596)
    })
    it('should generate [<min>, <max>)', function() {
      expect(new Random(0).rand(50, 100)).to.equal(77.4406751152128)
    })
    it('should generate [<min>, <max>) with negatives', function() {
      expect(new Random(0).rand(-10, -2)).to.equal(-5.609491981565952)
    })
    it('should generate [<min>, <max>) across 0', function() {
      expect(new Random(1).rand(-1, 1)).to.equal(-0.16595600312575698)
    })
  })
  describe('integers', function() {
    it('should generate the same result for the same seed', function() {
      expect(new Random(314).randInt()).to.equal(new Random(314).randInt())
    })
    it('should generate different results for different seeds', function() {
      expect(new Random(314).randInt()).to.not.equal(new Random(2718).randInt())
    })
    it('should generate [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER) with no params', function() {
      expect(new Random(0).randInt()).to.equal(-1426063362)
    })
    it('should generate [0, <max>)', function() {
      expect(new Random(0).randInt(100)).to.equal(54)
    })
    it('should generate [<min>, <max>)', function() {
      expect(new Random(0).randInt(50, 100)).to.equal(76)
    })
    it('should generate [<min>, <max>) with negatives', function() {
      expect(new Random(0).randInt(-10, -2)).to.equal(-6)
    })
    it('should generate [<min>, <max>) across 0', function() {
      expect(new Random(1).randInt(-10, 10)).to.equal(-2)
    })
  })
  describe('longs', function() {
    it('should generate the same result for the same seed', function() {
      expect(new Random(314).randLong()).to.equal(new Random(314).randLong())
    })
    it('should generate different results for different seeds', function() {
      expect(new Random(314).randLong()).to.not.equal(new Random(2718).randLong())
    })
    it('should generate [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER) with no params', function() {
      expect(new Random(0).randLong()).to.equal(879345883152383)
    })
    it('should generate [0, <max>)', function() {
      expect(new Random(0).randLong(100)).to.equal(54)
    })
    it('should generate [<min>, <max>)', function() {
      expect(new Random(0).randLong(50, 100)).to.equal(77)
    })
    it('should generate [<min>, <max>) with negatives', function() {
      expect(new Random(0).randLong(-10, -2)).to.equal(-6)
    })
    it('should generate [<min>, <max>) across 0', function() {
      expect(new Random(1).randLong(-10, 10)).to.equal(-2)
    })
  })
})
