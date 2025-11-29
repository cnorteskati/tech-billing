import { useSound } from '@/hooks/useSound';
import { CheckCircle, TableChart, Description } from '@mui/icons-material';
import { Box, useTheme, alpha } from '@mui/material';

interface FileListItemProps {
  id: string;
  title: string;
  type: 'report' | 'documentation';
  completed: boolean;
  onToggle: (id: string) => void;
}

const SUCCESS_SOUND_URL = '/sounds/success.wav';
const CLICK_SOUND_URL = '/sounds/click.wav';

export default function FileListItem({
  id,
  title,
  type,
  completed,
  onToggle,
}: FileListItemProps) {
  const theme = useTheme();

  const playSuccess = useSound(SUCCESS_SOUND_URL);
  const playClick = useSound(CLICK_SOUND_URL);

  const colorKey = type === 'report' ? 'success' : 'info';
  const mainColor = theme.palette[colorKey].main;

  const BaseIcon = type === 'report' ? TableChart : Description;

  const handleToggle = () => {
    if (!completed) {
      playSuccess();
    } else {
      playClick();
    }
    onToggle(id);
  };

  return (
    <Box
      onClick={handleToggle}
      className="group flex items-center p-4 mb-3 rounded-xl border shadow-sm cursor-pointer transition-[transform,box-shadow] duration-200 select-none"
      sx={{
        backgroundColor: completed
          ? alpha(mainColor, 0.08)
          : 'background.paper',
        borderColor: completed ? alpha(mainColor, 0.3) : 'divider',
        ...(!completed && {
          '&:hover': {
            borderColor: alpha(mainColor, 0.5),
            boxShadow: theme.shadows[2],
          },
        }),
      }}
    >
      {/* Icon Section */}
      <div
        className="p-3 rounded-lg mr-4 flex items-center justify-center"
        style={{
          backgroundColor: completed
            ? alpha(mainColor, 0.15)
            : theme.palette.action.hover,
          color: mainColor,
        }}
      >
        {completed ? (
          <CheckCircle className="text-2xl" />
        ) : (
          <BaseIcon className="text-2xl" />
        )}
      </div>

      {/* Text Section */}
      <div className="flex-1 min-w-0">
        <h4
          className="font-medium text-sm sm:text-base truncate"
          style={{
            color: completed
              ? theme.palette.text.disabled
              : theme.palette.text.primary,
            textDecoration: completed ? 'line-through' : 'none',
            textDecorationColor: completed
              ? alpha(theme.palette.text.disabled, 0.5)
              : 'transparent',
          }}
        >
          {title}
        </h4>
        {/* // TODO change this to use theme color */}
        <span className="text-xs text-gray-400 font-light capitalize">
          {type}
        </span>
      </div>
    </Box>
  );
}
