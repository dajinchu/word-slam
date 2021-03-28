import React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../common/Button";

interface Info {
  name: string;
}
export function NameModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: (info: Info) => void;
}) {
  const { register, handleSubmit, errors } = useForm<Info>();
  if (visible) {
    return (
      <div className="fixed z-10 inset-0">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Background opacity */}
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          {/* Modal body*/}
          <div
            className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full "
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <form onSubmit={handleSubmit(onClose)} autoComplete="off">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="mt-2">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="block mb-2 text-lg font-medium text-gray-900"
                          id="modal-headline"
                        >
                          What should we call you?
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoFocus
                          ref={register({
                            required: true,
                            maxLength: 12,
                            minLength: 1,
                          })}
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>
                      {errors.name &&
                        "Name must be between 1 and 12 characters"}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <div>
                  <Button size="fill" type="submit">
                    Join Game!
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
