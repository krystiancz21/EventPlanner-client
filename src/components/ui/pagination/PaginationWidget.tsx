import {
  ButtonGroup,
  IconButton,
  Pagination,
} from "@chakra-ui/react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginationWidgetProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const PaginationWidget = ({
  currentPage,
  totalItems,
  pageSize,
  onPageChange
}: PaginationWidgetProps) => {
  return (
    <Pagination.Root
      count={totalItems}
      pageSize={pageSize}
      page={currentPage}
      onPageChange={(e) => onPageChange(e.page)}
    >
      <ButtonGroup variant="ghost" size="sm">
        <Pagination.PrevTrigger asChild>
          <IconButton>
            <HiChevronLeft />
          </IconButton>
        </Pagination.PrevTrigger>

        <Pagination.Items
          render={(page) => (
            <IconButton variant={{ base: "ghost", _selected: "outline" }}>
              {page.value}
            </IconButton>
          )}
        />

        <Pagination.NextTrigger asChild>
          <IconButton>
            <HiChevronRight />
          </IconButton>
        </Pagination.NextTrigger>
      </ButtonGroup>
    </Pagination.Root>
  );
};