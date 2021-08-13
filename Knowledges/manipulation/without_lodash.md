- chain 대체
    - ```_([1, 2, 3])
       .tap(function(array) {
         // Mutate input array.
         array.pop();
       })
       .reverse()
       .value();
      // [2, 1]
      // becomes
      const pipeline = [
        array => { array.pop(); return array; },
        array => array.reverse()
      ];
      pipeline.reduce((xs, f) => f(xs), [1, 2, 3]);```

- https://youmightnotneed.com/lodash/
