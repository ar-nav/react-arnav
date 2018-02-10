
import React from 'react';
import hiro from './assets/hiro.png';

const styles = {
    container: {
        position: 'absolute',
        zIndex: -1,
        bottom: '7rem',
        left: 0,
        right: 0,
        textAlign: 'center',
        padding: 'auto auto',
    },
    content: {
        display: 'inline-block',
        color: 'lime',
        borderColor: 'lime',
        borderWidth: 2,
        borderStyle: 'solid',
        maxWidth: 200,
        fontWeight: 'bold',
        fontSize: '1.5rem',
        padding: 10,
    },
    img: {
        marginTop: '1rem',
        height: '5rem',
        width: '5rem',
    }
};

export default () => (
    <div style={styles.container}>
        <div style={styles.content}>
            Find nearest HIRO Marker <br/>
            <img style={styles.img} alt="Hiro marker example" src={hiro} />
        </div>
        
    </div>
);
