export enum ExpressionType
{
    // An addition operation, such as a + b, without overflow checking, for numeric operands.
    Add = 1,
    // A conditional AND operation that evaluates the second operand only if the first operand evaluates to true. It corresponds to (a && b) in C# and (a AndAlso b) in Visual Basic.
    AndAlso,
    // A method call, such as in the obj.sampleMethod() expression.
    Call,
    // A node that represents a null coalescing operation, such as (a ?? b) in C# or If(a, b) in Visual Basic.
    Coalesce,
    // A constant value.
    Constant,
    // A division operation, such as (a / b), for numeric operands.
    Divide,
    // A node that represents an equality comparison, such as (a == b) in C# or (a = b) in Visual Basic.
    Equal,
    // A bitwise or logical XOR operation, such as (a ^ b) in C# or (a Xor b) in Visual Basic.
    ExclusiveOr,
    // A "greater than" comparison, such as (a > b).
    GreaterThan,
    // A "greater than or equal to" comparison, such as (a >= b).
    GreaterThanOrEqual,
    // A "less than" comparison, such as (a < b).
    LessThan,
    // A "less than or equal to" comparison, such as (a <= b).
    LessThanOrEqual,
    // An operation that reads from a field or property, such as obj.SampleProperty.
    MemberAccess,
    // An arithmetic remainder operation, such as (a % b) in C# or (a Mod b) in Visual Basic.
    Modulo,
    // A multiplication operation, such as (a * b), without overflow checking, for numeric operands.
    Multiply,
    // An arithmetic negation operation, such as (-a). The object a should not be modified in place.
    Negate,
    // An inequality comparison, such as (a != b) in C# or (a <> b) in Visual Basic.
    NotEqual,
    // A short-circuiting conditional OR operation, such as (a || b) in C# or (a OrElse b) in Visual Basic.
    OrElse,
    // A mathematical operation that raises a number to a power, such as (a ^ b) in Visual Basic.
    Power,
    // A subtraction operation, such as (a - b), without overflow checking, for numeric operands.
    Subtract,
    // A true condition value.
    IsTrue,
    // A false condition value.
    IsFalse
}


export type BinaryExpressionType =
    ExpressionType.Add
    | ExpressionType.AndAlso
    | ExpressionType.Coalesce
    | ExpressionType.Divide
    | ExpressionType.Equal
    | ExpressionType.ExclusiveOr
    | ExpressionType.GreaterThan
    | ExpressionType.GreaterThanOrEqual
    | ExpressionType.LessThan
    | ExpressionType.LessThanOrEqual
    | ExpressionType.MemberAccess
    | ExpressionType.Modulo
    | ExpressionType.Multiply
    | ExpressionType.NotEqual
    | ExpressionType.OrElse
    | ExpressionType.Power
    | ExpressionType.Subtract
    ;