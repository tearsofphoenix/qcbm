import math from 'mathjs'
import {argsort, arrayDiff, partial} from "./polyfill";
//  Pauli Matrices
const mc = math.complex

const I2 = math.identity(2)
const sx = math.matrix([[0, 1], [1, 0.]])
const sy = math.matrix([[0, mc(0, -1)], [mc(0, 1), 0.]])
const sz = math.matrix([[1, 0], [0, -1.]])

const p0 = math.divide(math.add(sz, I2), 2)
const p1 = math.divide(math.subtract(I2, sz), 2)
const h = (sx + sz) / Math.SQRT2
const sxyz = [I2, sx, sy, sz]

// single bit rotation matrices

function _ri(si, theta) {
  return math.add(math.multiply(Math.cos(theta / 2.), I2), math.multiply(mc(0, -Math.sin(theta/2.)), si))
}

function rx(theta) {
  return _ri(sx, theta)
}

function ry(theta) {
  return _ri(sy, theta)
}

function rz(theta) {
  return _ri(sz, theta)
}

/**
 * a general rotation gate rz(t3)rx(r2)rz(t1).

 Args:
 t1, t2, t3 (float): three angles.

 Returns:
 2x2 csr_matrix: rotation matrix.
 * @param t1
 * @param t2
 * @param t3
 */
function rot(t1, t2, t3) {
  return math.dot(math.dot(rz(t3), rx(t2)), rz(t1))
}

// multiple bit construction

function CNOT(ibit, jbit, n) {
  let res = _([p0, I2], [ibit, jbit], n)
  res = res + _([p1, sx], [ibit, jbit], n)
  return res
}

/**
 * Put operators in a circuit and compile them.

 notice the big end are high loc bits!

 Args:
 ops (list): list of single bit operators.
 locs (list): list of positions.
 n (int): total number of bits.

 Returns:
 csr_matrix: resulting matrix.
 * @param ops
 * @param locs
 * @param n
 * @private
 */
function _(ops, locs, n) {
  const dim = locs.size().length
  if(dim === 0) {
    locs = [locs]
  }
  if(Array.isArray(ops)) {
    ops = [ops]
  }
  locs = Array.from(locs)
  locs.forEach((v, i) => locs[i] = n - v)
  const order = argsort(locs)
  locs = [0, ...partial(locs, order), n + 1]
  return _wrap_identity(order.map(i => ops[i]), arrayDiff(locs) - 1)
}

function _wrap_identity(data_list, num_bit_list) {
  if(num_bit_list.length !== data_list.length + 1) {
    throw new Error('')
  }

  let res = math.identity(2 ** num_bit_list[0])
  const array = num_bit_list.slice(1)
  data_list.forEach((data, i) => {
    const nbit = array[i]
    res = math.kron(res, data)
    res = math.kron(res, math.identity(2 ** nbit))
  })
  return res
}
