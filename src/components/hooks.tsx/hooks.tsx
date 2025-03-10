import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TargetStore {
  value: string;
  valueList: Record<
    string,
    { id: string; text: string; date: string; completed: boolean }[]
  >;
  setValue: (newValue: string) => void;
  addList: (date: string) => void;
  removeList: (index: number, date: string) => void;
  toggleCompletion: (index: number, date: string) => void;
}

const targetStore = create<TargetStore>()(
  persist(
    (set) => ({
      value: "",
      valueList: {},
      setValue: (newValue: string) => set({ value: newValue }),

      addList: (date: string) =>
        set((state) => {
          const newId = Date.now().toString();
          const newItem = {
            id: newId,
            text: state.value,
            date,
            completed: false,
          };
          const updatedValueList = { ...state.valueList };

          if (!updatedValueList[date]) {
            updatedValueList[date] = [];
          }

          updatedValueList[date].push(newItem);
          return {
            valueList: updatedValueList,
            value: "",
          };
        }),

      removeList: (index: number, date: string) =>
        set((state) => ({
          valueList: {
            ...state.valueList,
            [date]: state.valueList[date]?.filter((_, i) => i !== index) || [],
          },
        })),

      toggleCompletion: (index: number, date: string) =>
        set((state) => {
          const updatedValueList = { ...state.valueList };
          if (updatedValueList[date]) {
            updatedValueList[date][index].completed =
              !updatedValueList[date][index].completed;
          }
          return { valueList: updatedValueList };
        }),
    }),
    {
      name: "target-storage",
    }
  )
);

export default targetStore;
