import { useState } from 'react';
import { Combobox, useCombobox, useMantineColorScheme } from '@mantine/core';
import { IconAdjustmentsHorizontal } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { updateSort } from '../Slices/SortSlice';

const opt = ['Relevance', 'Most Recent', 'Salary: Low to High', 'Salary: High to Low'];
const talentSort = [
  "Relevance",
  "Experience: Low to High",
  "Experience: High to Low"
];

const Sort = (props: any) => {
  const dispatch = useDispatch();
  const [selectedItem, setSelectedItem] = useState<string | null>('Relevance');
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const options = (props.sort === 'job' ? opt : talentSort).map((item) => (
    <Combobox.Option 
      className={`text-xs py-2 px-3 rounded-lg cursor-pointer transition-colors ${
        selectedItem === item 
          ? 'text-amber-500 font-bold bg-amber-500/10' 
          : isDark 
            ? 'text-slate-300 hover:bg-white/5 hover:text-white' 
            : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
      }`} 
      value={item} 
      key={item}
    >
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      width={190}
      position="bottom-end"
      styles={{
        dropdown: {
          backgroundColor: isDark ? '#121724' : '#ffffff',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(15, 23, 42, 0.1)',
          padding: '6px',
          borderRadius: '12px',
          boxShadow: isDark ? '0 20px 40px -10px rgba(0,0,0,0.8)' : '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
        }
      }}
      onOptionSubmit={(val) => {
        setSelectedItem(val);
        dispatch(updateSort(val));
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <button
          type="button"
          onClick={() => combobox.toggleDropdown()}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer shadow-sm ${
            isDark
              ? "bg-slate-900/80 hover:bg-slate-800 border-white/10 hover:border-amber-500/30 text-slate-200"
              : "bg-white hover:bg-slate-50 border-slate-200 hover:border-amber-500/40 text-slate-700"
          }`}
        >
          <IconAdjustmentsHorizontal size={15} className="text-amber-500" />
          <span>Sort: <span className="text-amber-500 font-bold">{selectedItem}</span></span>
        </button>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};

export default Sort;
