import { Button } from "antd";
import React, { useContext, useEffect } from "react";
import { listEvents } from "../../../Firebase/firebaseutils";
import { UserContext } from "../../../UserProvider";

const Events = () => {
  const { events, setEvents } = useContext(UserContext);

  useEffect(() => {});

  const loadmore = () => {
    listEvents(events.filter || {}, events.lastkey).then((res) => {
      setEvents({ ...res, list: [...events.list, ...res.list] });
    });
  };

  return (
    <div className="flex  flex-col container items-center mt-20  border-2 pb-20 shadow-sm shadow-[#f8fafc]">
      <h2 className="flex text-[46px] fonr-poppins font-bold m-10">
        Popular Events
      </h2>
      <div className="flex">
        <div className="grid grid-cols-3 gap-y-20 gap-x-20  w-auto   ">
          {(events?.list || []).map((event, index) => (
            <article
              key={index}
              className="flex flex-col w-96 h-96 cursor-pointer rounded-[20px] shadow-lg  border-[0.2px "
            >
              <section className="w-full h-60 bg-white  ">
                <img
                  loading="lazy"
                  src={event.Event_poster}
                  alt=""
                  className="object-cover h-full border-2 w-96"
                />
              </section>
              <section className="flex justify-center border-t-[0.2px]  flex-1 items-center  gap-10   bg-white">
                <div className="flex ">
                  <h3 className="flex flex-col text-red-600 text-[13px]">
                    {new Date(event.Event_Date).toLocaleString("default", {
                      month: "short",
                    })}

                    <span className="text-black">
                      {new Date(event.Event_Date).getDate()}
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col">
                  <h3 className="flex ">
                    {event.Event_Name} - {event.Event_Place}
                  </h3>
                  <section className="flex flex-col">
                    <h4 className="flex ">{event.Event_State}</h4>
                    <p className="flex">
                      {new Date(event.Event_Date).toDateString()} ,
                      <span className="text-red-800">{event.Event_Time}</span>
                    </p>
                  </section>
                </div>
              </section>
            </article>
          ))}
        </div>
      </div>
      {events.lastkey && (
        <div className="flex mt-10">
          <Button onClick={loadmore}>Load More</Button>
        </div>
      )}
    </div>
  );
};

export default Events;
