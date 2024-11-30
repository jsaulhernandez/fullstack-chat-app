import { useChatStore } from "../store/useChatStore";

const EmptyMessages = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        <div className="flex justify-center mb-4">
          <img
            src={selectedUser?.profilePic || "/avatar.png"}
            alt="profile image"
            className="size-16 object-cover rounded-full animate-bounce"
          />
        </div>

        {/* Indication */}
        <p className="text-base-content/60">
          <span className="font-bold">Say:</span> Hi! 👋&nbsp;
          {selectedUser?.fullName}
        </p>
      </div>
    </div>
  );
};

export default EmptyMessages;
