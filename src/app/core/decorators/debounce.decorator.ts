import * as _ from 'underscore' ;

export function Debounce(milliSecond) {
	return function(target: any, key: any, descriptor: any){
		const oldFunc = descriptor.value ;
		const newFunc = _.debounce(oldFunc, milliSecond) ;
		descriptor.value = function(){
			return newFunc.apply(this, arguments) ;
		}
	}
}
