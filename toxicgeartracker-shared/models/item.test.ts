import { Item } from ".";

describe("Item", () => {
  test("should have a name", () => {
    // Arrange, Act
    // Act
    const mockItem: Item = { id: 123, name: "Test Item" };

    // Assert
    expect(mockItem).toHaveProperty("name");
  });
  test('should have an id', () => {
    // Arrange, Act
    // Act
    const mockItem: Item = { id: 123, name: "Test Item" };

    // Assert
    expect(mockItem).toHaveProperty("id");
  });
});
