export class QueueNode<T> {
  v: T;
  next: QueueNode<T> | null;

  constructor(v: T, next: QueueNode<T> | null = null) {
    this.v = v;
    this.next = next;
  }
}

export class Queue<T> {
  private start: QueueNode<T> | null;
  private end: QueueNode<T> | null;
  private _size = 0;

  constructor() {
    this.start = this.end = null;
  }

  dequeue(): T | null {
    if (this._size === 0) {
      return null;
    } else {
      let temp = this.start!;
      this.start = this.start!.next;
      --this._size;
      return temp.v;
    }
  }

  enqueue(v: T) {
    if (this._size === 0) {
      this.start = this.end = new QueueNode(v);
      ++this._size;
    } else {
      this.end!.next = new QueueNode(v);
      this.end = this.end!.next;
      ++this._size;
    }
  }

  get(index: number): T | any {
    if (this._size > index) {
      let now = this.start!;
      while (index > 0) {
        now = now.next!;
        --index;
      }
      return now.v;
    } else {
      return null;
    }
  }

  set(index: number, v: T) {
    if (this._size > index) {
      let node: QueueNode<T> | null = this.start;
      while (node && index > 0) {
        node = node.next;
        --index;
      }
      node!.v = v;
    }
  }
  
  remove(index: number = 0, numbers: number = 1) {
    if (this._size <= numbers) {
      this._size = 0;
      this.start = this.end = null;
      return;
    }
    if (index === 0) {
      let node: QueueNode<T> | null = this.start;
      while (node?.next && numbers > 0) {
        node = node.next;
        --numbers;
      }
      this.start = node;
    } else {
      let node: QueueNode<T> | null = this.start;
      while (node && index > 1) {
        node = node.next;
        --index;
      }

    }
  }

  add(v: T) {
    this.enqueue(v);
  }
  
  addAll(v: T[]) {
    v.forEach(item => this.add(item));
  }

  merge(mergeQueue: Queue<T>) {
    this.end!.next = mergeQueue.start;
    this.end = mergeQueue.end;
    this._size += mergeQueue._size;
  }

  /**
   * 从链表中搜索某值的下标。
   * @param v 要寻找的值
   * @param start 从哪里找起
   * @returns 返回值的下标，如果没有该值，则返回-1
   */
  
  indexOf(v: T, start: number = 0): number {
    let node: QueueNode<T> | null = this.start;
    let index = start;
    while (node && start > 0) {
      node = node.next;
      --start;
    }
    while (node) {
      if (node.v === v) { return index }
      else {
        node = node.next;
        ++index;
      }
    }
    return -1;
  }
  
  size(): number {
    return this._size;
  }

  hasElement(): boolean {
    return this._size > 0;
  }

  /**
   * 切割链表，返回一个数组
   * @param start 开始的index
   * @param size 数量，默认-1，则全部返回
   */
  
  subList(start: number = 0, size: number = -1): T[] {
    let node: QueueNode<T> | null = this.start;
    const res: T[] = []
    while (node && start > 0) {
      node = node.next;
      --start;
    }
    if (size !== -1) {
      while (node && size > 0) {
        --size;
        res.push(node.v);
        node = node.next;
      }
    } else {
      while (node) {
        res.push(node.v);
        node = node.next;
      }
    }
    return res;
  }

  sort() {
    
  }
  
  data() {
    return this.subList();
  }
}