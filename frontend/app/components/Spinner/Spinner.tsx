const Spinner = () => {
    return (
        <div>
           
<div className="infinityChrome">
    <div></div>
    <div></div>
    <div></div>
</div>

<div className="infinity">
    <div>
        <span></span>
    </div>
    <div>
        <span></span>
    </div>
    <div>
        <span></span>
    </div>
</div>

<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ display: 'none' }}>
    <defs>
        <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
        </filter>
    </defs>
</svg>


<a className="dribbble" href="https://dribbble.com/shots/5557955-Infinity-Loader" target="_blank"><img src="https://cdn.dribbble.com/assets/dribbble-ball-mark-2bd45f09c2fb58dbbfb44766d5d1d07c5a12972d602ef8b32204d28fa3dda554.svg" alt=""/></a>
        </div>
    )
}

export default Spinner;