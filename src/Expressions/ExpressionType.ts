export enum ExpressionType
{
    // An addition operation, such as a + b, without overflow checking, for numeric operands.
    Add = 0,
    // A conditional AND operation that evaluates the second operand only if the first operand evaluates to true. It corresponds to (a && b) in C# and (a AndAlso b) in Visual Basic.
    AndAlso = 1,
    // A method call, such as in the obj.sampleMethod() expression.
    Call = 2,
    // A node that represents a null coalescing operation, such as (a ?? b) in C# or If(a, b) in Visual Basic.
    Coalesce = 3,
    // A constant value.
    Constant = 4,
    // A division operation, such as (a / b), for numeric operands.
    Divide = 5,
    // A node that represents an equality comparison, such as (a == b) in C# or (a = b) in Visual Basic.
    Equal = 6,
    // A bitwise or logical XOR operation, such as (a ^ b) in C# or (a Xor b) in Visual Basic.
    ExclusiveOr = 7,
    // A "greater than" comparison, such as (a > b).
    GreaterThan = 8,
    // A "greater than or equal to" comparison, such as (a >= b).
    GreaterThanOrEqual = 9,
    // A "less than" comparison, such as (a < b).
    LessThan = 10,
    // A "less than or equal to" comparison, such as (a <= b).
    LessThanOrEqual = 11,
    // An operation that reads from a field or property, such as obj.SampleProperty.
    MemberAccess = 12,
    // An arithmetic remainder operation, such as (a % b) in C# or (a Mod b) in Visual Basic.
    Modulo = 13,
    // A multiplication operation, such as (a * b), without overflow checking, for numeric operands.
    Multiply = 14,
    // An arithmetic negation operation, such as (-a). The object a should not be modified in place.
    Negate = 15,
    // An inequality comparison, such as (a != b) in C# or (a <> b) in Visual Basic.
    NotEqual = 16,
    // A short-circuiting conditional OR operation, such as (a || b) in C# or (a OrElse b) in Visual Basic.
    OrElse = 17,
    // A mathematical operation that raises a number to a power, such as (a ^ b) in Visual Basic.
    Power = 18,
    // A subtraction operation, such as (a - b), without overflow checking, for numeric operands.
    Subtract = 19,
    // A true condition value.
    IsTrue = 20,
    // A false condition value.
    IsFalse = 21,
    // A field
    FieldAccess = 22
}