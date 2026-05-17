"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useAppState } from "@/hooks/useAppState";
import Review from "@/components/AboutPage/Review";

const CustomerReviewForm = () => {

    const { revFnc, add_remove_ToToast } = useAppState()

    const [name, setName] = useState("");
    const [review, setReview] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imagePreview, setImagePreview] = useState("");
    const [rating, setRating] = useState(0);



    const handleImageFileChange = (e) => {
        const file = e.target.files[0];

        setImagePreview(URL.createObjectURL(file));

        if (file) {
            const imagepath = URL.createObjectURL(file);
            setImageUrl(imagepath);
        }

    };

    const handleRemoveImage = () => {
        setImageUrl("");
        setImagePreview("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (name || review || rating || imageUrl) {
            const newReview = {
                name,
                review,
                rating: rating,
                imageUrl: imageUrl,
            };

            revFnc(newReview)
            add_remove_ToToast("Your review has been submit")

            setName("");
            setReview("");
            setImageUrl("");
            setImagePreview("");

        } else {
            alert("Fil all field")
        }

    };


    return (

        <div className="mt-[10vw] flex flex-col items-center">

            <div className="w-[550px] border-[#737865] shadow rounded-3xl justify-center items-center">
                <form
                    onSubmit={handleSubmit}
                    className="bg-white rounded px-9 pt-6 pb-8 mb-4 w-full">
                    <h2 className="text-2xl font-montserrat font-semibold text-center  mb-4">Submit Your Review</h2>

                    <div className="mb-4">
                        <label className="block text-prh2 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            className="appearance-none border rounded-full w-full py-3 px-3 text-[#737865] leading-tight focus:outline-none focus:shadow-outline font-sans"
                            id="name"
                            name="name"
                            type="text"
                            value={name}
                            placeholder="Enter your name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <h1 className="text-sm font-bold mb-2 text-prh2">Rate this product</h1>
                    <div className="flex space-x-1 items-center justify-between mb-4">
                        <div className="">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`cursor-pointer text-3xl px-1 font-bold
                            ${star <= rating ? 'text-yellow-400' : 'text-prh2'
                                        }`}
                                >
                                    ★
                                </span>
                            ))}
                        </div>


                        <p className="text-md font-semibold">Your rating: {rating}</p>
                    </div>


                    <div className="my-2">
                        <label className="block text-prh2 text-sm font-bold mb-2">Upload Image</label>
                        <input
                            type="file"
                            onChange={handleImageFileChange}
                            className="appearance-none border rounded-full w-full py-3 px-3 text-[#737865] leading-tight focus:outline-none focus:shadow-outline font-sans"
                            accept="image/*"
                            disabled={imageUrl !== ""}
                        />
                    </div>


                    {imagePreview && (
                        <div className="mb-4 text-center">
                            <label className="block text-gray-700 font-semibold mb-2">Image Preview</label>
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-24 h-24 rounded-full object-cover mx-auto mb-2"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="bg-btn text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
                            >
                                Remove Image
                            </button>
                        </div>
                    )}

                    <div className="mb-6">
                        <label className="block text-prh2 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            className="appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline font-sans"
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="Write your message"
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            className="w-full bg-btn border border-btn hover:text-black font-bold py-3 px-4 rounded-full focus:outline-none focus:shadow-outline font-sans hover:bg-transparent text-white transition duration-300"
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>

            <div className="">
                <Review />
            </div>
        </div>
    );
};

export default CustomerReviewForm;

