
const defaultKey = {
    up: 'ArrowUp',
    down: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
};

const rotatesMap = {
    "right": 0,
    "up": -Math.PI/2,
    "left": Math.PI,
    "down": Math.PI/2,
    "right+up": -Math.PI/4,
    "left+up": -Math.PI*3/4,
    "right+down": Math.PI/4,
    "left+down": Math.PI*3/4
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
