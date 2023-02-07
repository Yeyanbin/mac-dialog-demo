
const defaultKey = {
    up: 'up',
    down: 'down',
    left: 'left',
    right: 'right'
};

const useKeyRotation = (options: {
    up: string, down: string, left: string, right: string,
} = defaultKey) => {
    const getKeyRotation = () => {

    };
    
    const keydownListener = (ev: KeyboardEvent) => {
        console.log('keydown', ev);
    }
    const keyupListener = (ev: KeyboardEvent) => {
        console.log('keyup', ev);
    }

    document.addEventListener('keydown', keydownListener);

    document.addEventListener('keyup', keyupListener)

    const destory = () => {
        document.removeEventListener('keydown', keydownListener);
        document.removeEventListener('keyup', keyupListener);
    }

    return {
        getKeyRotation,
        destory,
    };
}

export default useKeyRotation;
