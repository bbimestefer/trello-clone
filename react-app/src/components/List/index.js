import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { createCard } from '../../store/card'
import { getAllLists } from '../../store/list'
import CardDetails from '../Card'
import ListForm from '../Forms/ListForm'
import './index.css'

function ListDetails(list) {
    const dispatch = useDispatch()
    const [ name, setName ] = useState('')
    const [ showCardForm, setShowCardForm ] = useState(false)
    const cards = list.cards
    const {id} = useParams()
    const [errors, setErrors] = useState([])


    useEffect(() => {
        const e = []
        if(!name.trim() && name.length) e.push("Name cannot be white space")
        if(!name.length) e.push("Name is required")
        setErrors(e)
    }, [name])

    const updateName = (e) => setName(e.target.value)

    const handleCardForm = () => setShowCardForm(!showCardForm)

    const handleCardSubmit = (e) => {
        e.preventDefault()
        const list_id = list.id
        const payload = {
            list_id,
            name
        }

        return dispatch(createCard(payload)).then(() => dispatch(getAllLists(id)))
        .then(() => {
            setName('')
            setShowCardForm(false)
        })
    }

    return (
        <div className='listContainer fdc g1'>
            <div className='fdr jcsb'>
                <ListForm {...list} />
            </div>
            <div className='cardContainer fdc'>
                {cards && cards.map(card => (
                        <CardDetails key={card.id} {...card} />
                    ))}
                    { !showCardForm && <button className='addCardOnList jcfs' onClick={handleCardForm}>Add a card</button>}
                    { showCardForm && (
                        <div>
                            <form className='fdc cardForm' onSubmit={handleCardSubmit}>
                                <input
                                className='cardInput'
                                type='text'
                                placeholder='Enter a title for this card...'
                                required
                                autoFocus
                                maxLength={50}
                                value={name}
                                onChange={updateName}
                                onKeyDown={(event) => {
                                    if(event.key === "Escape") {
                                        setName('')
                                        handleCardForm()
                                    }
                                }}
                                />
                                <div className='cardActionButtons'>
                                    <button disabled={!!errors.length} type='submit' className='addCardForm cw'>Add card</button>
                                    <div onClick={handleCardForm} type='button'><i className="fa-regular fa-x cancelListForm fwb jcc cur"></i></div>
                                    <div style={{"position":"absolute"}}>
                                    {errors.map((error, ind) => (
                                        <div className="cardError" key={ind}>{error}</div>
                                    ))}
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default ListDetails
