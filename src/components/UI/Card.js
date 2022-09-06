// import classes from './Card.module.css'

const Card = props => {
    return (
        <div className='shadow-2xl shadow-slate-400 bg-white rounded-lg p-4'>
            {/* <div className={classes.card}> */}
            {props.children}
        </div>
    )
}

export default Card
