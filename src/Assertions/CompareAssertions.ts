//using EnsureFramework.Assertions;
//using System;
//using System.Collections.Generic;
//using System.Diagnostics;
//using System.Text;

//namespace EnsureFramework
//{
//    /// <summary>
//    /// Ensure assertions for <see cref="IComparable{T}"/>'s
//    /// </summary>
//    public static class CompareAssertions
//    {
//        /// <summary>
//        /// Ensures the argument is greater than or equal to the specified value.
//        /// </summary>
//        /// <param name="this">The this.</param>
//        /// <param name="value">The value.</param>
//        /// <exception cref="System.ArgumentNullException"></exception>
//        [DebuggerNonUserCode]
//        public static IArgumentAssertionBuilder<T> IsGreaterThanOrEqualTo<T>(this IArgumentAssertionBuilder<T> @this, T value)
//            where T : IComparable<T>
//        {
//            if (@this.Argument.CompareTo(value) < 0)
//            {
//                throw new ArgumentException($"The argument '{@this.ArgumentName}' is not greater than or equal to '{value}'", @this.ArgumentName);
//            }
//            return @this;
//        }

//        /// <summary>
//        /// Ensures the argument is less than or equal to the specified value.
//        /// </summary>
//        /// <param name="this">The this.</param>
//        /// <param name="value">The value.</param>
//        /// <exception cref="System.ArgumentNullException"></exception>
//        [DebuggerNonUserCode]
//        public static IArgumentAssertionBuilder<T> IsLessThanOrEqualTo<T>(this IArgumentAssertionBuilder<T> @this, T value)
//            where T : IComparable<T>
//        {
//            if (@this.Argument.CompareTo(value) > 0)
//            {
//                throw new ArgumentException($"The argument '{@this.ArgumentName}' is not less than or equal to '{value}'", @this.ArgumentName);
//            }
//            return @this;
//        }

//        /// <summary>
//        /// Ensures the argument is less than the specified value.
//        /// </summary>
//        /// <param name="this">The this.</param>
//        /// <param name="value">The value.</param>
//        /// <exception cref="System.ArgumentNullException"></exception>
//        [DebuggerNonUserCode]
//        public static IArgumentAssertionBuilder<T> IsLessThan<T>(this IArgumentAssertionBuilder<T> @this, T value)
//            where T : IComparable<T>
//        {
//            if (@this.Argument.CompareTo(value) != -1)
//            {
//                throw new ArgumentException($"The argument '{@this.ArgumentName}' is not less '{value}'", @this.ArgumentName);
//            }
//            return @this;
//        }

//        /// <summary>
//        /// Ensures the argument is greater than the specified value.
//        /// </summary>
//        /// <param name="this">The this.</param>
//        /// <param name="value">The value.</param>
//        /// <exception cref="System.ArgumentNullException"></exception>
//        [DebuggerNonUserCode]
//        public static IArgumentAssertionBuilder<T> IsGreaterThan<T>(this IArgumentAssertionBuilder<T> @this, T value)
//            where T : IComparable<T>
//        {
//            if (@this.Argument.CompareTo(value) != 1)
//            {
//                throw new ArgumentException($"The argument '{@this.ArgumentName}' is not greater than '{value}'", @this.ArgumentName);
//            }
//            return @this;
//        }

//        /// <summary>
//        /// Ensures the argument is equal to the specified value.
//        /// </summary>
//        /// <param name="this">The this.</param>
//        /// <param name="value">The value.</param>
//        /// <exception cref="System.ArgumentNullException"></exception>
//        [DebuggerNonUserCode]
//        public static IArgumentAssertionBuilder<T> IsEqualTo<T>(this IArgumentAssertionBuilder<T> @this, T value)
//            where T : IComparable<T>
//        {
//            if (@this.Argument.CompareTo(value) != 0)
//            {
//                throw new ArgumentException($"The argument '{@this.ArgumentName}' is not equal to '{value}'", @this.ArgumentName);
//            }
//            return @this;
//        }
//    }
//}
