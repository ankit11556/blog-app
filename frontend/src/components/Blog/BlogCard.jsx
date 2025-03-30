import { Card, Text, Button } from "@mantine/core";
import { Link } from "react-router-dom";

const BlogCard = ({ id, title, content="", author }) => {

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text fw={700} size="lg">{title}</Text>
      <Text size="sm" mt="sm" color="dimmed">
        {content.length > 100 ? content.slice(0, 100) + "..." : content}
      </Text>
      <Text size="xs" mt="xs" color="gray">By {author}</Text>

      {/* Read More Button */}
      <Button component={Link} to={`/blog/${id}`} fullWidth mt="md" color="blue">
        Read More
      </Button>
    </Card>
  );
};

export default BlogCard;
