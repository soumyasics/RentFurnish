import React from 'react'
import img1 from "../../Assets/Homeimg1.png"
import img2 from "../../Assets/Rectangle 4.png"
import img3 from "../../Assets/Rectangle 6.png"
import "./Usercarousel.css"

function Usercarousel() {
    return (
        <div>
            <div className="carousel">
                <div
                    id="carouselExampleInterval"
                    class="carousel slide"
                    data-bs-ride="carousel"
                >
                    <div class="carousel-inner" style={{height:"700px"}}>
                        <div class="carousel-item active" data-bs-interval="5000" id='carousel-item'>
                            <img src={img1} class="d-block w-100" alt="..." />
                            <div className="carousel-caption">
                    <h5>Rent a Furniture</h5>
                    {/* <p>Additional details or description</p> */}
                </div>
                        </div>
                        <div class="carousel-item" data-bs-interval="2000" id='carousel-item'>
                            <img src={img2} class="d-block w-100" alt="..." />
                        </div>
                        <div class="carousel-item" id='carousel-item'>
                            <img src={img3} class="d-block w-100" alt="..."  />
                        </div>
                    </div>
                    <button
                        class="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleInterval"
                        data-bs-slide="prev"
                    >
                        <span
                            class="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                        class="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleInterval"
                        data-bs-slide="next"
                    >
                        <span
                            class="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Usercarousel