const Carousel = ({ images }) => {
  if (images !== undefined)
    return (
      <div className="pt-5 ml-5 md:ml-0">
        <img
          src={`${images[0]?.image}`}
          alt="surfing"
          className="w-56 md:w-10/12  rounded-md"
        />
        {images.length > 1 ? (
          <div className="flex flex-wrap space-y-7 md:space-y-0 md:flex-nowrap md:space-x-8 pt-10">
            <img
              src={`${images[1]?.image}`}
              alt="surfing"
              className=" w-56 md:w-32 lg:w-48 rounded-md "
            />
            <img
              src={`${images[2]?.image}`}
              alt="surfing"
              className=" w-56 md:w-32 lg:w-48 rounded-md "
            />
          </div>
        ) : null}
      </div>
    );
  // todo to add loader io in here
  return <h1>...</h1>;
};

export default Carousel;
