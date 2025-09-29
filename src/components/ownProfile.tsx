export const OwnProfile = () => {
  return (
    <div>
      <div className="relative">
        <div className="border rounded-full w-20 h-20">
          <div className="absolute h-10 w-10 left-11 bottom-6 border border-neutral-900 rounded-full border-5 bg-neutral-900"></div>
          <img
            src="https://img.icons8.com/ios_filled/512/FFFFFF/plus.png"
            className="absolute h-10 w-10 left-11 bottom-6 border border-neutral-900 rounded-full border-5"
          />
        </div>
        <div className="text-white text-[14px] font-[400] p-2">
          {" "}
          Your story{" "}
        </div>
      </div>
    </div>
  );
};
