import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { CSVLink } from "react-csv";

const AdminContainer = styled.div`
  padding: 20px;
  background: #0a0a0a;
  min-height: 100vh;
  color: #64ffda;
`;

const Controls = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const SearchInput = styled.input`
  padding: 8px 15px;
  border-radius: 4px;
  background: #112240;
  border: 1px solid #233554;
  color: #ccd6f6;
  &:focus {
    outline: none;
    border-color: #64ffda;
  }
`;

const Select = styled.select`
  padding: 8px 15px;
  border-radius: 4px;
  background: #112240;
  border: 1px solid #233554;
  color: #ccd6f6;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 8px 15px;
  border-radius: 4px;
  background: ${props => props.variant === 'export' ? '#2ecc71' : '#64ffda'};
  color: #0a0a0a;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

const MessageCard = styled.div`
  background: #112240;
  padding: 20px;
  margin: 10px 0;
  border-radius: 8px;
  border: 1px solid #233554;
  position: relative;
  ${props => !props.isRead && `
    border-left: 4px solid #64ffda;
  `}
`;

const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const MessageInfo = styled.div`
  color: #8892b0;
  margin: 5px 0;
`;

const MessageText = styled.p`
  color: #ccd6f6;
  margin: 10px 0;
`;

const ReplySection = styled.div`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #233554;
`;

const ReplyInput = styled.textarea`
  width: 100%;
  padding: 10px;
  background: #1d2d50;
  border: 1px solid #233554;
  color: #ccd6f6;
  border-radius: 4px;
  margin-bottom: 10px;
  resize: vertical;
`;

const Stats = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  background: #112240;
  padding: 15px;
  border-radius: 8px;
`;

const StatItem = styled.div`
  text-align: center;
  p {
    color: #8892b0;
    margin: 5px 0;
  }
  h3 {
    color: #64ffda;
    margin: 0;
  }
`;

const AdminPanel = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filterBy, setFilterBy] = useState("all");
  const [replyText, setReplyText] = useState({});
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    lastWeek: 0
  });

  const fetchMessages = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/api/messages');
      const data = await response.json();
      setMessages(data);
      updateStats(data);
      applyFilters(data, searchTerm, filterBy, sortBy);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }, [searchTerm, filterBy, sortBy]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const updateStats = (data) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    
    setStats({
      total: data.length,
      unread: data.filter(msg => !msg.read).length,
      lastWeek: data.filter(msg => new Date(msg.timestamp) > oneWeekAgo).length
    });
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE'
      });
      fetchMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const handleReply = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/messages/${id}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reply: replyText[id] })
      });
      setReplyText({ ...replyText, [id]: '' });
      fetchMessages();
    } catch (error) {
      console.error('Error sending reply:', error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/messages/${id}/read`, {
        method: 'PUT'
      });
      fetchMessages();
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  const applyFilters = (messages, search, filter, sort) => {
    let filtered = [...messages];

    // Search
    if (search) {
      filtered = filtered.filter(msg => 
        msg.name.toLowerCase().includes(search.toLowerCase()) ||
        msg.email.toLowerCase().includes(search.toLowerCase()) ||
        msg.message.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filter
    switch(filter) {
      case 'unread':
        filtered = filtered.filter(msg => !msg.read);
        break;
      case 'read':
        filtered = filtered.filter(msg => msg.read);
        break;
      default:
        break;
    }

    // Sort
    switch(sort) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      default:
        break;
    }

    setFilteredMessages(filtered);
  };

  useEffect(() => {
    applyFilters(messages, searchTerm, filterBy, sortBy);
  }, [searchTerm, filterBy, sortBy, messages]);

  const csvData = messages.map(msg => ({
    Name: msg.name,
    Email: msg.email,
    Message: msg.message,
    Date: new Date(msg.timestamp).toLocaleString(),
    Status: msg.read ? 'Read' : 'Unread'
  }));

  return (
    <AdminContainer>
      <h2>Message Dashboard</h2>
      
      <Stats>
        <StatItem>
          <p>Total Messages</p>
          <h3>{stats.total}</h3>
        </StatItem>
        <StatItem>
          <p>Unread Messages</p>
          <h3>{stats.unread}</h3>
        </StatItem>
        <StatItem>
          <p>Last 7 Days</p>
          <h3>{stats.lastWeek}</h3>
        </StatItem>
      </Stats>

      <Controls>
        <SearchInput
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
          <option value="all">All Messages</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </Select>

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </Select>

        <CSVLink 
          data={csvData}
          filename={"messages.csv"}
          style={{ textDecoration: 'none' }}
        >
          <Button variant="export">Export to CSV</Button>
        </CSVLink>
      </Controls>

      {filteredMessages.map((msg) => (
        <MessageCard key={msg._id} isRead={msg.read}>
          <MessageHeader>
            <h3>{msg.name}</h3>
            <div>
              {!msg.read && (
                <Button onClick={() => markAsRead(msg._id)}>Mark as Read</Button>
              )}
              <Button onClick={() => handleDelete(msg._id)} style={{ marginLeft: '10px', background: '#ff4a4a' }}>
                Delete
              </Button>
            </div>
          </MessageHeader>
          
          <MessageInfo>Email: {msg.email}</MessageInfo>
          <MessageInfo>Date: {new Date(msg.timestamp).toLocaleString()}</MessageInfo>
          <MessageText>{msg.message}</MessageText>

          <ReplySection>
            <ReplyInput
              placeholder="Write a reply..."
              value={replyText[msg._id] || ''}
              onChange={(e) => setReplyText({
                ...replyText,
                [msg._id]: e.target.value
              })}
            />
            <Button onClick={() => handleReply(msg._id)}>
              Send Reply
            </Button>
          </ReplySection>
        </MessageCard>
      ))}
    </AdminContainer>
  );
};

export default AdminPanel; 