
/**
 * 2D向量 
 */
export interface IVector {
  x: number;
  y: number;
  // z: number;

  i: number;
  j: number;
  // k: number;
}

interface IVectorIndex {
  x: number;
  y: number;
}

export const useVector = (index: IVectorIndex) => {

  const vector: IVector = {
    ...index,
    i: 0,
    j: 0,
  };
  
  const changeVector = ({ i, j }) => {
    vector.i = i || vector.i;
    vector.j = j || vector.j;
  }
  const getVector = () => vector;
  
  return {
    getVector,
    changeVector,
  };
};
