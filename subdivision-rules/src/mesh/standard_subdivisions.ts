import { V, type Vec2 } from "./types";

const PI = Math.PI;

/**
 * Standard 5:3 rectangle:
 * R0=(0,0), R1=(5,0), R2=(5,3), R3=(0,3)
 * subdivision coordinates in canonical order fixed in 
 * dodecahedral-subdivision-rectangle.png
 */
const R1 = {x:0, y:0};
const R2 = {x:0, y:5}; 
const R3 = {x:3, y:5}; 
const R4 = {x:3, y:0};
const R = {x:2, y:0};
const Rmid = {x: 0, y: 1.5};
// assuming 9 15 14 13 12 5 are evenly angularly spaced by PI / 7 along that half circle which seems false
// and so for example i think 15 could be computed in two ways and those two ways will be inconsistent
// on a napkin ic omputed the right angle that 15 makes in the 1.5 circle is 
// arctan(1.5 tan pi/5) from assuming the left side is evenly 5-sected and the geometry of 
// oh i did it wrong but also it looks like approx 2 pi / 7 is right
export const STD_QUAD: readonly Vec2[] = Object.freeze([
    { x: 0, y: 1 }, // 1
    { x: 0, y: 2 }, // 2
    { x: 0, y: 3 }, // 3
    { x: 0, y: 4 }, // 4 
    V.add(V.scale(R2, 0.5), V.rot(Rmid, 6 * PI / 7)), // 5
    V.rot(R, 4 * PI / 10), // 6 is (0,2) rotated CW pi/10 degrees or (2,0) rot CCW 4pi/10
    V.add(R2, V.rot(R, PI / 10)), // 8 
    V.add(V.scale(R2, 0.5), V.rot(Rmid, PI / 7)), // 9
    { x: 1, y: 0 }, // 10
    V.rot(R, 3 * PI / 10), // 12 is (2,0) rotated CCW 3pi/10 degrees 
    V.add(R2, V.rot(R, 2 * PI / 10)), // 15
    { x: 1, y: 5 }, // 17
    V.rot(R, 2 * PI / 10), // 18 is (2,0) rotated CCW 2pi/10 degrees 
    V.add(R2, V.rot(R, 3 * PI / 10)), // 19
    R, // 20
    V.rot(R, PI / 10), // 21 is (2,0) rotated CCW pi/10 degrees 
    V.add({x:3, y:2.5}, V.rot(Rmid, 5 * PI / 7)), // 22
    V.add({x:3, y:2.5}, V.rot(Rmid, 4 * PI / 7)), // 23
    V.add({x:3, y:2.5}, V.rot(Rmid, 3 * PI / 7)), // 24
    V.add({x:3, y:2.5}, V.rot(Rmid, 2 * PI / 7)), // 25
    V.add(R2, V.rot(R, 4 * PI / 10)), // 26
    { x: 2, y: 5 }, // 27
    V.add({x:3, y:2.5}, V.rot(Rmid, 6 * PI / 7)), // 28
    V.add(R4, V.rot(R, 6 * PI / 10)), // 29
    V.add(R3, V.rot(R, -6 * PI / 10)), // 31
    V.add({x:3, y:2.5}, V.rot(Rmid, PI / 7)), // 32
    { x: 3, y: 1 }, // 33
    { x: 3, y: 2 }, // 34
    { x: 3, y: 3 }, // 35
    { x: 3, y: 4 }  // 36
] as const);