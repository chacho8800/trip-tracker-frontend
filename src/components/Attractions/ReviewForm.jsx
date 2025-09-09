import { useState } from 'react'

const ReviewForm = ({handleAddReview}) => {

    const [formData, setFormData] = useState({
        rating: "",
        comment: "",
    })

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // add review to db
        handleAddReview(formData)
        setFormData({
            rating: "",
            comment: ""
        })
    }

  return (
    <form onSubmit={handleSubmit}>
        <label htmlFor="rating">Rating:</label>
        <select 
        name="rating"
        id="rating"
        value={formData.rating}
        onChange={handleChange}
        >

        <option value=""></option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
        </select>

        <br />

        <label htmlFor="comment">Comment:</label>
        <textarea 
        name="comment"
        id="comment"
        value={formData.comment}
        onChange={handleChange}
        rows={3}
        cols={30}
        ></textarea>
        <br />
        
        <button type='submit'> Submit Review </button>
    </form>
  )
}

export default ReviewForm