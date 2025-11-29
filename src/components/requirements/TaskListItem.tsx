import { useSound } from '@/hooks/useSound';
import { CalendarMonth, AccessTime } from '@mui/icons-material';
import { Box, useTheme, alpha } from '@mui/material';

export type UrgencyLevel = 'High' | 'Medium' | 'Low';

interface TaskItemProps {
  id: string;
  task: string;
  date: string;
  urgency: UrgencyLevel;
  completed: boolean;
  onToggle: (id: string) => void;
}

const SCRIBBLE_SOUND_URL = '/sounds/scribble.wav';
const CLICK_SOUND_URL = '/sounds/click.wav';

export default function TaskItem({
  id,
  task,
  date,
  urgency,
  completed,
  onToggle,
}: TaskItemProps) {
  const theme = useTheme();

  const playScribble = useSound(SCRIBBLE_SOUND_URL, { start: 0.5, end: 1 });
  const playClick = useSound(CLICK_SOUND_URL);

  // Map Urgency to Theme Palette colors
  const getUrgencyColor = (level: UrgencyLevel) => {
    switch (level) {
      case 'High':
        return theme.palette.error;
      case 'Medium':
        return theme.palette.warning;
      case 'Low':
        return theme.palette.success;
      default:
        return theme.palette.text;
    }
  };

  const urgencyPalette = getUrgencyColor(urgency);
  const mainColor = urgencyPalette.main;
  const lightColor =
    'light' in urgencyPalette ? urgencyPalette.light : mainColor;

  const handleToggle = () => {
    if (!completed) {
      playScribble();
    } else {
      playClick();
    }
    onToggle(id);
  };

  return (
    <Box
      onClick={handleToggle}
      className="relative overflow-hidden cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between p-4 mb-3 rounded-xl border transition-[transform,box-shadow,opacity] duration-300 select-none"
      sx={{
        backgroundColor: completed ? 'action.hover' : 'background.paper',
        borderColor: completed ? 'divider' : alpha(mainColor, 0.3),
        opacity: completed ? 0.6 : 1,

        ...(!completed && {
          '&:hover': {
            borderColor: mainColor,
            boxShadow: theme.shadows[2],
          },
        }),
      }}
    >
      {/* Strikethrough Line Animation */}
      <Box
        className={`absolute top-1/2 left-4 h-0.5 z-10 rounded-full transition-[width] duration-500 ease-out pointer-events-none ${
          completed ? 'w-[90%]' : 'w-0'
        }`}
        sx={{ bgcolor: 'text.secondary' }}
      />

      {/* Left Content: Title and Date */}
      <div className="flex items-start gap-3 z-0 mb-2 sm:mb-0">
        <div className="mt-0.5 text-gray-400">
          <CalendarMonth fontSize="small" />
        </div>
        <div>
          <h4
            className="font-medium text-sm sm:text-base"
            style={{
              color: completed
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
            }}
          >
            {task}
          </h4>
          <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
            <AccessTime sx={{ fontSize: 14 }} />
            <span>Due: {date}</span>
          </div>
        </div>
      </div>

      {/* Right Content: Urgency Badge */}
      <div className="flex items-center sm:justify-end z-0 ml-8 sm:ml-0">
        <span
          className="px-2.5 py-1 rounded-full text-xs font-semibold border border-transparent"
          style={{
            backgroundColor: completed
              ? theme.palette.action.selected
              : alpha(mainColor, 0.1),
            color: completed
              ? theme.palette.text.disabled
              : theme.palette.mode === 'dark'
              ? lightColor
              : theme.palette.getContrastText
              ? theme.palette.getContrastText(lightColor)
              : mainColor,
            ...(theme.palette.mode === 'light' &&
              !completed && { color: mainColor }),
          }}
        >
          {urgency} Priority
        </span>
      </div>
    </Box>
  );
}
