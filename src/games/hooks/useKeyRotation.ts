
const defaultKey = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
};

const rotatesMap = {
    "right": 0,
    "up": -1.5707963267948966,
    "left": 3.141592653589793,
    "down": 1.5707963267948966,
    "right+up": -0.7853981633974483,
    "left+up": -2.356194490192345,
    "right+down": 0.7853981633974483,
    "left+down": 2.356194490192345
}

const useKeyRotation = ({ up, down, left, right }: {
    up: string, down: string, left: string, right: string,
} = defaultKey) => {
    const getKeyRotation = () => {
        if (keyMaps[left] && keyMaps[up]) { 
            return rotatesMap['left+up'];
        }
        if (keyMaps[left] && keyMaps[down]) { 
            return rotatesMap['left+down'];
        }
        if (keyMaps[right] && keyMaps[up]) { 
            return rotatesMap['right+up'];
        } 
        if (keyMaps[right] && keyMaps[down]) { 
            return rotatesMap['right+down'];
        }
        if (keyMaps[left]) {
            return rotatesMap['left'];
        }
        if (keyMaps[right]) {
            return rotatesMap['right'];
        }
        if (keyMaps[up]) {
            return rotatesMap['up'];
        }
        if (keyMaps[down]) {
            return rotatesMap['down'];
        }
        return undefined;
    };

    const keyMaps = {};
    
    const keydownListener = (ev: KeyboardEvent) => {
        // console.log('keydown', ev);
        keyMaps[ev.key] = true;
    }
    const keyupListener = (ev: KeyboardEvent) => {
        // console.log('keyup', ev);
        keyMaps[ev.key] = false;
    }

    document.addEventListener('keydown', keydownListener);

    document.addEventListener('keyup', keyupListener)

    const destory = () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
    }

    const isRight = () => {
        return !keyMaps[left];
    }

    return {
        getKeyRotation,
        isRight,
        destory,
    };
}

export default useKeyRotation;
