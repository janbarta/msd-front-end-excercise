import {
  Navbar,
  Alignment,
  Button,
  InputGroup,
  ControlGroup,
  HTMLSelect,
} from "@blueprintjs/core";
import React, { useState } from "react";

interface IProps {
  setSelectedFilter: React.Dispatch<React.SetStateAction<undefined | string>>;
}

/**
 * Header component renders the top Navbar with search bar and filter select
 * @param {IPorps} {setSelectedFilter} is a useState function sent by Parent PublishedPost
 * @return {jsx} Header/Navbar of the app
 */
export const Header: React.FC<IProps> = ({ setSelectedFilter }) => {
  const [searchInput, setSearchInput] = useState<string>("");

  const handleOnChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchInput(e.target.value);

  const handleOnChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSelectedFilter(e.currentTarget.value);

  const FILTER_OPTIONS = ["Filter", "Science", "Hobby"]; //can be done by the payload using react context or refs

  return (
    <Navbar className="sticky-nav">
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blogs</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <Navbar.Divider />
        <ControlGroup className="bp3-minimal">
          <InputGroup
            value={searchInput}
            onChange={handleOnChangeSearch}
            placeholder="Find filters..."
          />
          <Button icon="search" text="SEARCH" />
        </ControlGroup>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <ControlGroup>
          <HTMLSelect
            onChange={handleOnChangeFilter}
            options={FILTER_OPTIONS}
          />
        </ControlGroup>
      </Navbar.Group>
    </Navbar>
  );
};
