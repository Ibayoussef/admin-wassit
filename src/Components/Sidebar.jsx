import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import {
  ChatBubbleOutline,
  PeopleOutline,
  ListAltOutlined,
  RequestPageOutlined,
  MessageOutlined,
  RateReviewOutlined,
  ReceiptLongOutlined,
  ReportOffOutlined,
  DashboardOutlined,
  CleaningServicesOutlined,
  AssignmentIndOutlined,
  WorkHistoryOutlined,
} from '@mui/icons-material';

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const handleListItemClick = (item, index) => {
    setSelectedItem(index);
    navigate(item.url);
  };

  const listItemData = [
    { text: 'Requests', icon: <RequestPageOutlined />, url: '/' },
    { text: 'Dashboard', icon: <DashboardOutlined />, url: 'dashboard' },
    { text: 'Users', icon: <PeopleOutline />, url: 'users' },
    { text: 'Projects', icon: <WorkHistoryOutlined />, url: 'projects' },
    { text: 'Services', icon: <CleaningServicesOutlined />, url: 'services' },
    { text: 'Assignements', icon: <AssignmentIndOutlined />, url: 'assign' },
    { text: 'Reviews', icon: <RateReviewOutlined />, url: 'reviews' },
    { text: 'Receipts', icon: <ReceiptLongOutlined />, url: 'receipts' },
    { text: 'Form Data', icon: <ListAltOutlined />, url: 'formdata' },
    { text: 'Reports', icon: <ReportOffOutlined />, url: 'reports' },
    { text: 'Chat', icon: <ChatBubbleOutline />, url: 'chat' },
  ];

  return (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          boxShadow: '2px 0 5px -2px rgba(0, 0, 0, 0.2)',
        },
      }}
    >
      <List sx={{ marginTop: 8 }}>
        {listItemData.map((item, index) => (
          <Tooltip title={item.text} placement="right" key={item.text}>
            <ListItemButton
              selected={selectedItem === index}
              onClick={() => handleListItemClick(item, index)}
              sx={{
                pl: 4,
                '&.Mui-selected': {
                  backgroundColor: 'rgba(1, 1, 1, 0.2)', // Highlight color for selected item
                  '& .MuiListItemIcon-root': {
                    color: '#111', // Icon color for selected item
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(1, 1, 1, 0.25)', // Hover color for selected item
                  },
                },
                '&:hover': {
                  backgroundColor: 'rgba(1, 1, 1, 0.25)', // Hover color
                  '& .MuiListItemIcon-root': {
                    color: '#111', // Icon hover color
                  },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(1, 1, 1, 0.5)' }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.text}
                primaryTypographyProps={{ color: 'rgba(1, 1, 1, 1)' }}
              />
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
