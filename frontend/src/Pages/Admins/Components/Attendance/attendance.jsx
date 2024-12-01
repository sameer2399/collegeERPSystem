import {
  Button,
  Checkbox,
  CheckboxGroup,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage, NormalModal } from "../../../../Components";
import {
  fetchEventAttendees,
  submitAttendance,
} from "../../../../Redux/Actions";
export const MarkAttendance = (props) => {
  const { isOpen, onOpen, onClose } = props;
  const { loading, success, data, error, message, selectedEvent } = useSelector(
    (state) => state.eventattendance
  );
  const toast = useToast();
  const dispatch = useDispatch();
  const [attendees, setAttendees] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { eventId, title } = selectedEvent;
  useEffect(() => {
    if (eventId) {
      dispatch(fetchEventAttendees(eventId));
    }
    return () => {
      dispatch({ type: "MARK_ATTENDANCE_CLEAR" });
    };
  }, [eventId]);

  const handleSelectAttendee = (attendee) => {
    const { id, name, auid } = attendee;
    const newAttendees = [...attendees];
    const index = newAttendees.findIndex((item) => item.id === id);
    if (index === -1) {
      newAttendees.push({ id, name, auid });
    } else {
      newAttendees.splice(index, 1);
    }
    setAttendees(() => newAttendees);
  };

  const handleSubmitAttendance = async () => {
    setIsLoading(true);
    const auid = attendees.map((item) => item.auid);
    const payload = {
      eventId,
      attendance: auid,
    };
    const data = await dispatch(submitAttendance(payload, toast));
    if (data === true) {
      onClose();
    }
    setIsLoading(false);
  };
  return (
    <NormalModal
      title={`Attendance for ${title}`}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      {loading && (
        <div className="flex justify-center items-center min-h-full">
          <Spinner size="md" />
        </div>
      )}
      {error && (
        <ErrorMessage
          className="text-sm"
          message={message}
          submessage={"Oops, Something went Wrong."}
        />
      )}
      {!loading && success && (
        <>
          <CheckboxGroup colorScheme="green" className="">
            {data?.map((user) => {
              return (
                <Checkbox
                  onChange={() => handleSelectAttendee(user)}
                  key={user.id}
                  size="lg"
                  colorScheme="green"
                  width="100%"
                  mb={2}
                  checked={attendees.find((item) => item.id === user.id)}
                  disabled={user.status !== "confirmed"}
                >
                  {user.name}
                </Checkbox>
              );
            })}
          </CheckboxGroup>
          {attendees.length > 0 && (
            <div className="flex justify-end">
              <Button
                disabled={isLoading}
                isLoading={isLoading}
                onClick={handleSubmitAttendance}
              >
                Submit Attendance
              </Button>
            </div>
          )}
        </>
      )}
    </NormalModal>
  );
};
